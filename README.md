# SAPCF_NodeRoleAuth
SAP Cloud Foundry role based authorization in node JS

Project Name: AuthTest
Testing:
Part 1: Fetch OAuth berarer token
1. Run URL using REST Client: 
    Method: POST
    URL: https://xxxx.hana.ondemand.com/oauth/token
    Headers:
    Content-Type: application/x-www-form-urlencoded
    authorization: Basic XXXX -- Your Client ID and Client Secret found in uaa instance section created for your project of SCP Cockpit.
    Copy Bearer token

Part 2: Run the node JS webservice
1. Run the nodeJsmodule from your workspace. 
2. Run GET call for users: URL https://xxxxxx.hana.ondemand.com/users
3. Pass the OAuth credentials.
4. You would get 403 Forbidden error. So everything is working correctly upto now. We need to add the role to the user.
5. Configure the roles collections and user groups assignment in the SAP Cloud Platform cockpit for the user who is executing the webservice.
6. Test again.
