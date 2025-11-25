// src/components/AppMainTab.tsx
import React, { useState } from "react";

interface AppMainTabProps {
  foldable?: boolean;
  defaultOpen?: boolean;
}

const AppMainTab: React.FC<AppMainTabProps> = ({
  foldable = false,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const shouldShow = !foldable || isOpen;

  return (
    <div>
      {foldable && (
        <button
          className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "➖ Hide Ambivator Info" : "➕ Show Ambivator Info"}
        </button>
      )}

      {shouldShow && (
        <div className="space-y-6">
          <div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md space-y-4">
              <p>
                The{" "}
                <a
                  href="https://www.npmjs.com/package/http-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  npm package <strong>http-server</strong>
                </a>{" "}
                is a simple, zero-configuration command-line static file server.
              </p>
              <div className="alert alert-info">
                <span className="font-semibold">✅ Installation:</span>
              </div>
              <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>pnpm install -g http-server</code>
              </pre>
              <div className="alert alert-info">
                <span className="font-semibold">✅ Basic Usage:</span>
              </div>
              <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>http-server ./path/to/your/files</code>
              </pre>
              <div className="alert alert-success">
                <span className="font-semibold">
                  ✅ Features relevant to scientific viewing:
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Supports HTTP Range requests</strong> — required for
                  partial reads.
                </li>
                <li>
                  Enables streaming large files (e.g. <code>.tiff</code>,{" "}
                  <code>.nii</code>, <code>.mp4</code>).
                </li>
                <li>
                  Used by <code>@hms-dbmi/viv</code> in{" "}
                  <strong>Avivator</strong> / Ambivator for tiled 3D imaging.
                </li>
              </ul>
              <div className="alert alert-warning mt-6">
                <span className="font-semibold">
                  ⚠️ Access from HTTPS pages (e.g., GitHub Pages):
                </span>
              </div>
              <p>
                If your frontend is served from <strong>HTTPS</strong> (like
                GitHub Pages), the browser will block access to{" "}
                <strong>HTTP</strong> resources due to security restrictions (
                <em>Mixed Content</em>). To allow cross-origin access to your
                data server:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Run <code>http-server</code> in <strong>HTTPS mode</strong>
                </li>
                <li>
                  Enable <strong>CORS</strong> to allow JavaScript access from
                  other origins
                </li>
              </ul>
              <div className="alert alert-info">
                <span className="font-semibold">
                  🔐 How to generate HTTPS certificate (NIST P-256):
                </span>
              </div>
              <p>
                Most browsers support TLS certificates using either traditional
                <strong>RSA 2048-bit keys</strong> or elliptic curves based on
                the
                <strong>NIST standards</strong>, such as
                <strong>prime256v1</strong> (also called <em>NIST P-256</em>).
                While <code>openssl</code> can generate certificates with other
                curves like <em>secp256k1</em> (used in Bitcoin), browsers
                typically do not accept these for secure TLS connections.
              </p>

              <div class="">
                <span class="font-semibold">
                  Generate Private EC Key (NIST P-256)
                </span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Generate a private EC key using the NIST P-256 curve {"\n"}
                  openssl ecparam -name prime256v1 -genkey -noout -out
                  ~/server_keys/server-key.pem
                </code>
              </pre>

              <div class="">
                <span class="font-semibold">
                  Generate Certificate Signing Request (CSR)
                </span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Create a CSR (Certificate Signing Request) containing your
                  public key and subject info. {"\n"}
                  openssl req -new -key ~/server_keys/server-key.pem -out
                  ~/server_keys/server.csr -subj "/CN=your-ip-or-host"
                </code>
              </pre>

              <div class="">
                <span class="font-semibold">
                  Generate Self-Signed Certificate for Development
                </span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Generate a self-signed certificate for testing/development,
                  valid for 365 days {"\n"}
                  openssl x509 -req -in ~/server_keys/server.csr -signkey
                  ~/server_keys/server-key.pem -out
                  ~/server_keys/server-cert.pem -days 365
                </code>
              </pre>
              <p>
                You can now start <code>http-server</code> in HTTPS mode with
                CORS enabled using the generated certificate and key:
              </p>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Start an HTTPS server with CORS enabled {"\n"}
                  http-server . -p 8080 --cors --ssl --cert
                  ~/server_keys/server-cert.pem --key
                  ~/server_keys/server-key.pem
                </code>
              </pre>

              <div class="alert alert-warning mb-4">
                <span class="font-semibold">
                  Setting Up a Self-Signed Certificate Authority (CA)
                </span>
              </div>
              <p>
                The above steps cover the basic process of creating a
                certificate for development purposes. Now, to get rid of the
                annoying certificate warnings in browsers like{" "}
                <strong>Chrome</strong> and <strong>Firefox</strong>, you can
                set up your own self-signed certificate authority (CA) and
                import it into your system's trusted certificate authorities.
                This will allow your certificate to be trusted by your browser,
                preventing warnings when accessing your site.
              </p>

              <div class="">
                <span class="font-semibold">
                  Generate CA Private Key and Self-Signed Certificate
                </span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Generate CA private key using NIST P-256 curve {"\n"}
                  openssl ecparam -name prime256v1 -genkey -noout -out
                  ~/server_keys/AMBCAT_CA.key {"\n"}# Generate a self-signed CA
                  certificate, valid for 10 years {"\n"}
                  openssl req -x509 -new -nodes -key ~/server_keys/AMBCAT_CA.key
                  -sha256 -days 3650 -out ~/server_keys/AMBCAT_CA.pem -subj
                  "/CN=AMBCAT_CA"
                </code>
              </pre>

              <div class="">
                <span class="font-semibold">
                  Sign the Server Certificate with the CA
                </span>
              </div>

              <p>
                Prepare <code>san.cnf</code> configuration file with additional
                details for the certificate, including Subject Alternative Names
                (SAN), such as IP addresses and DNS names.
              </p>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  authorityKeyIdentifier=keyid,issuer{"\n"}
                  basicConstraints=CA:FALSE{"\n"}
                  keyUsage = digitalSignature, nonRepudiation, keyEncipherment,
                  dataEncipherment{"\n"}
                  subjectAltName = @alt_names{"\n"}
                  [alt_names]{"\n"}
                  IP.1 = your.ip.address.here{"\n"}
                  IP.2 = alt.ip.address.if.any{"\n"}
                  IP.3 = 127.0.01{"\n"}
                  DNS.1 = localhost
                </code>
              </pre>
              <p>
                Sign the server CSR with the CA to create a trusted server
                certificate
              </p>
              <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  openssl x509 -req -in ~/server_keys/server.csr \{"\n"}
                  -CA ~/server_keys/AMBCAT_CA.pem \{"\n"}
                  -CAkey ~/server_keys/AMBCAT_CA.key \{"\n"}
                  -CAcreateserial \{"\n"}
                  -out ~/server_keys/server-cert-AMBCAT.pem \{"\n"}
                  -days 365 -sha256 \{"\n"}
                  -extfile ~/server_keys/san.cnf
                </code>
              </pre>

              <div class="alert alert-warning mb-4">
                <span class="font-semibold">
                  Importing the CA into Windows Trusted Authorities
                </span>
              </div>
              <p>
                To be recognized in browsers, typically you need to import the
                CA certificate into your operating system's trusted certificate
                store. Below are the steps for Windows:
              </p>

              <div class="">
                <span class="font-semibold">
                  Open PowerShell as Administrator
                </span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  start powershell -Command "Start-Process powershell -Verb
                  RunAs"
                </code>
              </pre>

              <div class="">
                <span class="font-semibold">
                  Import the CA Certificate into the Trusted Authorities Store.
                </span>
              </div>

              <div class="alert alert-info mb-4">
                 Download <a href="AMBCAT_CA.pem" download>AMBCAT_CA.pem ... certificate of the authority used for DESY network.</a>
	          </div>
              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Define the path to your PEM file and the store location for
                  trusted root certificates {"\n"}
                  $pemFilePath = "C:\path\to\AMBCAT_CA.pem"{"\n"}
                  $certStoreLocation = "Cert:\LocalMachine\Root"{"\n"}# Import
                  the certificate into the Trusted Root Certification
                  Authorities store {"\n"}
                  Import-Certificate -FilePath $pemFilePath -CertStoreLocation
                  $certStoreLocation
                </code>
              </pre>

              <p>
                After this step, your browser will trust the certificate and
                will no longer show warnings when accessing your site using{" "}
                <strong>HTTPS</strong>.
              </p>
	      <div class="alert alert-warning mb-4">
		<span class="font-semibold">
		  Importing the CA into Linux Trusted Authorities
		</span>
	      </div>
              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
		<code>
		  # Copy the CA certificate to the system's trusted CA directory
		  {"\n"}
		  cp AMBCAT_CA.pem /usr/local/share/ca-certificates/AMBCAT_CA.crt
		  {"\n"}# Update the system's CA certificates {"\n"}
		  dpkg-reconfigure ca-certificates
			{"\n"}#On Red Hat based systems, use: {"\n"}
		  update-ca-trust extract
		</code>
	      </pre>

              <div class="alert alert-info mb-4">
                <span class="font-semibold">Start HTTPS Server with CORS</span>
              </div>

              <pre class="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>
                  # Start an HTTPS server with CORS enabled {"\n"}
                  http-server . -p 8080 --cors --ssl --cert
                  ~/server_keys/server-cert-AMBCAT.pem --key
                  ~/server_keys/server-key.pem
                </code>
              </pre>

              <p>
                Once the server is running, your site will be served over{" "}
                <strong>HTTPS</strong>, and it will be accessible from web apps
                hosted on <code>https://</code> domains, such as those on GitHub
                Pages.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppMainTab;
