<?php

// Create a function that takes the desired subdomain name as a parameter
function create_subdomain($subdomain) {
  
  // Check if the subdomain already exists
  if (subdomain_exists($subdomain)) {
    // If the subdomain already exists, return an error message
    return "Error: Subdomain already exists.";
  } else {
    // If the subdomain does not already exist, create it
    $subdomain_path = "/var/www/html/subdomains/" . $subdomain;
    mkdir($subdomain_path);
    
    // Add the subdomain to the Apache configuration file
    $config_file = "/etc/httpd/conf/httpd.conf";
    $config_content = file_get_contents($config_file);
    $subdomain_config = "\n\n<VirtualHost *:80>\nServerName " . $subdomain . "\nDocumentRoot " . $subdomain_path . "\n</VirtualHost>";
    file_put_contents($config_file, $config_content . $subdomain_config);
    
    // Restart Apache to apply the changes
    exec("service httpd restart");
    
    // Return a success message
    return "Success: Subdomain " . $subdomain . " created successfully.";
  }
}

// Function to check if a subdomain already exists
function subdomain_exists($subdomain) {
  $subdomain_path = "/var/www/html/subdomains/" . $subdomain;
  if (file_exists($subdomain_path)) {
    return true;
  } else {
    return false;
  }
}

// Example usage of the create_subdomain function
echo create_subdomain("test");