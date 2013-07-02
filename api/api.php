<?php

require_once '../vendor/autoload.php';


header('Access-Control-Allow-Origin: *');

// Create an instance of Slim
$app = new \Slim\Slim();

$app->get('/api/:path', function ($path) {
    $client = new Github\Client();

    $client = new Github\Client();
    $method = Github\Client::AUTH_URL_CLIENT_ID;
    $filename = "http://localhost:8888/oSoctocat/config/githubApp.txt";
    $lines = file($filename, FILE_IGNORE_NEW_LINES);
    $usernameOrToken = $lines[1];
    $password = $lines[3];
    $client->authenticate($usernameOrToken, $password, $method);

    $contributors = $client->getHttpClient()->get($path);
    echo $contributors->getContent();
});

// Run Slim app
$app->response()->header('Content-Type', 'text/json');
$app->run();

