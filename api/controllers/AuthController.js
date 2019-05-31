const saml2 = require('saml2-js');
const fs = require('fs');

module.exports = {
  metadata: function (req, res) {
  	var sp_options = {
	  entity_id: "https://sp.example.com/metadata.xml",
	  private_key: fs.readFileSync("key-file.pem").toString(),
	  certificate: fs.readFileSync("cert-file.crt").toString(),
	  assert_endpoint: "https://sp.example.com/assert",
	  force_authn: true,
	  auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
	  nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
	  sign_get_request: false,
	  allow_unencrypted_assertion: true
	}
	var sp = new saml2.ServiceProvider(sp_options);
    
    let data = sp.create_metadata();

  	res.setHeader( "Content-type", "text/xml" );
    res.send(data);
  }
};