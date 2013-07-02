<!-- 
 * (c) 2013, OKFN. All rights reserved.
 * Author: @stefchri
 * index for oSoc13 vizualisation
 */
-->
<?php
require_once 'vendor/autoload.php';
$client = new Github\Client();


$method = Github\Client::AUTH_URL_CLIENT_ID;
$filename = "http://localhost:8888/oSoctocat/config/githubApp.txt";
$lines = file($filename, FILE_IGNORE_NEW_LINES);
$usernameOrToken = $lines[1];
$password = $lines[3];
$client->authenticate($usernameOrToken, $password, $method);

$contributors = $client->api('repo')->contributors('oSoc13', 'oSoctocat');

//var_dump(json_encode($contributors, JSON_PRETTY_PRINT));
var_dump($client);

?>
<!Doctype HTML>
<html>
<head>
    <title>Dataviz of oSoc13</title>
    <link rel="stylesheet" type="text/css" href="styles/index.css" />
    
</head>
<body>
    <h1>Hello World</h1>
    <hr/>
    <!-- Bottom scripts -->
    <script type="text/javascript" src="scripts/vendor/jquery-2.0.2.min.js" />    
    <script type="text/javascript" src="scripts/mylibs/main.js" />

</body>
</html>
