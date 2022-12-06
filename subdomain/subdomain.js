const fs = require("fs");
const path = require("path");

// Function to create a subdomain
function createSubdomain(subdomain) {
  // Check if the subdomain already exists
  if (subdomainExists(subdomain)) {
    // If the subdomain already exists, return an error message
    return "Error: Subdomain already exists.";
  } else {
    // If the subdomain does not already exist, create it
    const subdomainPath = path.join("/var/www/html/subdomains", subdomain);
    fs.mkdirSync(subdomainPath);

    // Add the subdomain to the Apache configuration file
    const configFile = "/etc/httpd/conf/httpd.conf";
    const configContent = fs.readFileSync(configFile, "utf8");
    const subdomainConfig =
      "\n\n<VirtualHost *:80>\nServerName " +
      subdomain +
      "\nDocumentRoot " +
      subdomainPath +
      "\n</VirtualHost>";
    fs.writeFileSync(configFile, configContent + subdomainConfig);

    // Restart Apache to apply the changes
    exec("service httpd restart");

    // Return a success message
    return "Success: Subdomain " + subdomain + " created successfully.";
  }
}

// Function to check if a subdomain already exists
function subdomainExists(subdomain) {
  const subdomainPath = path.join("/var/www/html/subdomains", subdomain);
  return fs.existsSync(subdomainPath);
}

// Example usage of the createSubdomain function
console.log(createSubdomain("test"));