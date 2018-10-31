<?php

use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

ini_set('display_errors', 1);
error_reporting(-1);

ErrorHandler::register();
ExceptionHandler::register();

$app->register(new Silex\Provider\DoctrineServiceProvider());

$app['dao.user'] = function ($app) {
	return new LaHairstyleApi\VideoDAO($app['db']);
};

// Register JSON data decoder for JSON requests
/*$app->before(function (Request $request) {

	if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
		$data = json_decode($request->getContent(), true);
		$request->request->replace(is_array($data) ? $data : array());
	}
});*/

$app->error(function (\Exception $e, Request $request, $code) {
    return new Response('We are sorry, but something went terribly wrong.'. $e->getMessage());
});