<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

// Controller for handling requests to create a subdomain
class SubdomainController extends Controller
{
  // View function to handle requests to create a subdomain
  public function create(Request $request)
  {
    // Get the desired subdomain name from the request data
    $subdomain = $request->input("subdomain");

    // Check if the subdomain already exists
    if ($this->subdomainExists($subdomain)) {
      // If the subdomain already exists, return an error message
      return response()->json(["error" => "Subdomain already exists."], 400);
    } else {
      // If the subdomain does not already exist, create it
      $subdomain_path = base_path("subdomains/" . $subdomain);
      File::makeDirectory($subdomain_path);

      // Add the subdomain to the Apache configuration file
      $config_file = base_path("conf/httpd.conf");
      $config_content = File::get($config_file);
      $subdomain_config = "\n\n<VirtualHost *:80>\nServerName " . $subdomain . "\nDocumentRoot " . $subdomain_path . "\n</VirtualHost>";
      File::put($config_file, $config_content . $subdomain_config);

      // Restart Apache to apply the changes
      exec("service httpd restart");

      // Return a success message
      return response()->json(["success" => "Subdomain " . $subdomain . " created successfully."]);
    }
  }

  // Function to check if a subdomain already exists
  public function subdomainExists($subdomain)
  {
    $subdomain_path = base_path("subdomains/" . $subdomain);
    return File::exists($subdomain_path);
  }
}