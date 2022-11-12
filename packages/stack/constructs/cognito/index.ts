import { Construct } from "constructs";
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import {
  AccountRecovery,
  ClientAttributes,
  UserPool,
  UserPoolClient,
  UserPoolEmail,
} from "aws-cdk-lib/aws-cognito";
import { getInviteEmail, getResetEmail } from "./emails";

const appUrl = "https://uccis.synergia.dev";

interface CongnitoProps {
  appUrl: string;
  supportEmail: string;
  email?: {
    fromEmail: string;
    fromName: string;
    replyTo: string;
  };
}

export class Cognito extends Construct {
  env = {
    AWS_APPCONFIG_EXTENSION_POLL_INTERVAL_SECONDS: "30",
    AWS_APPCONFIG_EXTENSION_POLL_TIMEOUT_MILLIS: "3000",
    AWS_APPCONFIG_EXTENSION_HTTP_PORT: "2772",
  };
  private readonly userPool: UserPool;
  private client: UserPoolClient;
  public userPoolClientId: string;
  public userPoolId: string;

  constructor(scope: Construct, id: string, props: CongnitoProps) {
    super(scope, id);

    // const smsRole = new Role(this, "CognitoSMSRole",{
    //   assumedBy: new ServicePrincipal('cognito-idp.amazonaws.com')
    // })
    //
    // const smsPolicy = new PolicyStatement({
    // })

    // Cognito User Pool
    this.userPool = new UserPool(this, "CognitoUserPool", {
      userPoolName: Stack.of(this).stackName,
      email: UserPoolEmail.withSES(
        // props.email || {
        {
          // fromEmail: "arn:aws:ses:us-west-2:685654804204:identity/no-reply@synergia.dev",
          fromEmail: "no-reply@synergia.dev",
          sesRegion:"us-west-2",
          fromName: "Lighthouse",
          replyTo: "support@synergia.dev",
          // configurationSetName:"string"
        }
      ),
      selfSignUpEnabled: false,
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireDigits: false,
        requireSymbols: false,
        requireUppercase: false,
        tempPasswordValidity: Duration.days(7),
      },

      userInvitation: {
        emailSubject: "Welcome",
        emailBody: getInviteEmail(props.appUrl),
      },
      userVerification: {
        emailSubject: "Password Reset",
        emailBody: getResetEmail(appUrl),
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,

      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Output the User Pool ID
    this.userPoolId = this.userPool.userPoolId;
    new CfnOutput(this, "CognitoUserPoolOut", {
      value: this.userPool.userPoolId,
      exportName: "CognitoUserPoolId",
    });

    // Configure user pool client read & write attributes
    const clientWriteAttributes = new ClientAttributes().withStandardAttributes(
      {
        email: true,
        fullname: true,
        givenName: true,
        familyName: true,
        profilePicture: true,
      }
    );
    const clientReadAttributes = clientWriteAttributes.withStandardAttributes({
      emailVerified: true,
      phoneNumberVerified: true,
      lastUpdateTime: true,
    });

    // Configure the user pool client application
    this.client = new UserPoolClient(this, "CognitoUserPoolClient", {
      userPoolClientName: Stack.of(this).stackName,
      userPool: this.userPool,
      authFlows: {
        adminUserPassword: true,
        userSrp: true,
        userPassword: true,
      },
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    });

    // Output the User Pool App Client ID
    this.userPoolClientId = this.client.userPoolClientId;
    new CfnOutput(this, "CognitoUserPoolClientOut", {
      value: this.client.userPoolClientId,
      exportName: "CognitoUserPoolClientId",
    });
  }
}
