from django.conf import settings
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
import os

# View function to handle requests to create a subdomain
@require_http_methods(["POST"])
def create_subdomain(request):
  # Get the desired subdomain name from the request data
  subdomain = request.POST["subdomain"]

  # Check if the subdomain already exists
  if subdomain_exists(subdomain):
    # If the subdomain already exists, return an error message
    return HttpResponse("Error: Subdomain already exists.")
  else:
    # If the subdomain does not already exist, create it
    subdomain_path = os.path.join(settings.BASE_DIR, "subdomains", subdomain)
    os.mkdir(subdomain_path)

    # Add the subdomain to the Apache configuration file
    config_file = os.path.join(settings.BASE_DIR, "conf", "httpd.conf")
    with open(config_file, "r") as f:
      config_content = f.read()
    subdomain_config = "\n\n<VirtualHost *:80>\nServerName " + subdomain + "\nDocumentRoot " + subdomain_path + "\n</VirtualHost>"
    with open(config_file, "w") as f:
      f.write(config_content + subdomain_config)

    # Restart Apache to apply the changes
    os.system("service httpd restart")

    # Return a success message
    return HttpResponse("Success: Subdomain " + subdomain + " created successfully.")

# Function to check if a subdomain already exists
def subdomain_exists(subdomain):
  subdomain_path = os.path.join(settings.BASE_DIR, "subdomains", subdomain)
  return os.path.exists(subdomain_path)