const Typography = () => (
  <div className={"mx-auto max-w-5xl px-8 py-6"}>
    <h1>
      The mystery of life isn't <strong>a problem to solve</strong>, but a
      reality to experience.
    </h1>
    <h2>
      The mystery of life isn't <strong>a problem to solve</strong>, but a
      reality to experience.
    </h2>
    <h3>
      The mystery of life isn't <strong>a problem to solve</strong>, but a
      reality to experience.
    </h3>
    <h4>
      The mystery of life isn't <strong>a problem to solve</strong>, but a
      reality to experience.
    </h4>
    <h5>
      The mystery of life isn't <strong>a problem to solve</strong>, but a
      reality to experience.
    </h5>
    <div>
      <p>
        Lorem ipsum <strong>dolor sit amet</strong>, consectetur adipiscing
        elit. Vivamus vulputate ipsum nunc, vitae pharetra dui commodo et. Donec
        pretium dolor non auctor facilisis. Donec{" "}
        <a href={"/popsicle"}>et metus nulla</a>. Interdum et malesuada fames ac{" "}
        <code>ante ipsum</code> primis in faucibus. Aenean placerat facilisis
        enim, id posuere justo fringilla eget.
        <br />
        <br />
        Ulla augue sem, rhoncus ac malesuada id, fringilla ac elit. Aenean
        feugiat velit vehicula, sodales nibh vel, porttitor orci. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae;
      </p>
      <hr />
      <p>
        Ulla augue sem, rhoncus ac malesuada id, fringilla ac elit. Aenean
        feugiat velit vehicula, sodales nibh vel, porttitor orci. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae;
      </p>
    </div>

    <pre>
      function round (num) <br />
      &nbsp; num
      <br />
      &nbsp; .toFixed(7)
      <br />
      &nbsp; .replace(/(\.[0-9]+?)0+$/, '$1')
      <br />
      &nbsp; .replace(/\.0$/, '')
      <br />
    </pre>
    <blockquote>
      <p>Aenean feugiat velit vehicula, sodales nibh vel, porttitor orci.</p>
    </blockquote>

    <figcaption>Vestibulum ante ipsum primis in faucibus</figcaption>
    <hr />

    <p>
      Ulla augue sem, rhoncus ac malesuada id, fringilla ac elit. Aenean feugiat
      velit vehicula, sodales nibh vel, porttitor orci. Vestibulum ante ipsum
      primis in faucibus orci luctus et ultrices posuere cubilia curae;
    </p>

    <ul>
      <li>luctus et ultrices posuere</li>
      <li>sodales nibh vel</li>
      <li>
        rhoncus ac malesuada id, fringilla ac elit. Aenean feugiat velit
        vehicula
      </li>
    </ul>

    <ol type={"i"}>
      <li>luctus et ultrices posuere</li>
      <li>luctus et ultrices posuere</li>
      <li>
        sodales nibh vel <br />
        <ol>
          <li>luctus et ultrices posuere</li>
          <li>sodales nibh vel</li>
        </ol>
      </li>
      <li>
        rhoncus ac malesuada id, fringilla ac elit. Aenean feugiat velit
        vehicula
      </li>
    </ol>
    <br />
    <table>
      <thead>
        <tr>
          <th>Wrestler</th>
          <th>Origin</th>
          <th>Finisher</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bret "The Hitman" Hart</td>
          <td>Calgary, AB</td>
          <td>Sharpshooter</td>
        </tr>
        <tr>
          <td>Stone Cold Steve Austin</td>
          <td>Austin, TX</td>
          <td>Stone Cold Stunner</td>
        </tr>
        <tr>
          <td>Randy Savage</td>
          <td>Sarasota, FL</td>
          <td>Elbow Drop</td>
        </tr>
        <tr>
          <td>Vader</td>
          <td>Boulder, CO</td>
          <td>Vader Bomb</td>
        </tr>
        <tr>
          <td>Razor Ramon</td>
          <td>Chuluota, FL</td>
          <td>Razor's Edge</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Typography;
