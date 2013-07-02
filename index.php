<?php

require_once 'vendor/autoload.php';


header('Access-Control-Allow-Origin: *');

\Slim\Slim::registerAutoloader();
// Create an instance of Slim
$app = new \Slim\Slim();

$app->get('/api/:name', function ($name) {
    $name = str_replace(array(" ", "+"),"/", $name);
    $client = new Github\Client();
    $method = Github\Client::AUTH_URL_CLIENT_ID;
    $filename = "config/githubApp.txt";
    $lines = file($filename, FILE_IGNORE_NEW_LINES);
    $usernameOrToken = $lines[1];
    $password = $lines[3];
    $client->authenticate($usernameOrToken, $password, $method);

    $contributors = $client->getHttpClient()->get($name);
    header('Content-Type', 'application/json');
    echo json_encode($contributors->getContent());
    
});

// Run Slim app

$app->run();
