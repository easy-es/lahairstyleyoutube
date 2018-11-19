<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;

// Get all videos
$app->get('/api/videos', function () use ($app) {

	$videos = $app['dao.user']->findAll();
	$responseData = array();

	foreach ($videos as $video) {
		$responseData[] = array(
			'id' => $video->getId(),
			'title' => $video->getTitle(),
			'description' => $video->getDescription(),
			'videoId' => $video->getVideoId(),
			'thumbnail' => $video->getThumbnail(),
			'date' => $video->getDate()
		);
	}

	return $app->json($responseData);
	})->bind('api_videos');

// Create video
$app->post('/api/video/create', function (Request $request) use ($app) {
	try {
			if (!$request->request->has('title') || !$request->request->has('videoId')) {
				return $app->json('Missing parameter: title or videoId', 400);
			} 
	
			$video = new LaHairstyleApi\Entity\Video();
			$video->setTitle($request->request->get('title'));
			$video->setVideoId($request->request->get('videoId'));
			$video->setDescription($request->request->get('description'));
			$video->setThumbnail($request->request->get('thumbnail'));
			$video->setSearch($request->request->get('search'));
			$video->setDate($request->request->get('date'));
			$app['dao.user']->save($video);

			$responseData = array(
				'id' => $video->getId(),
				'title' => $video->getTitle()
			);

			return $app->json($responseData, 201);
		} catch (\Exception $e ) {
			 //for debugging you can do like this
		    $handler = new ExceptionHandler();
		    $handler->handle( $e );

		    return new JsonResponse(
		        array(
		            'status' => 'error', 
		            'message' => $e->getMessage()
		        )
		    );
	}
})->bind('api_user_add'); 

$app->delete('/api/video/delete',function( Request $request) use ($app) {
	$id = ($request->request->get('videoId'));
	$video = $app['dao.user']->delete($id);

	return $app->json(202);
})->bind('api_video_delete');

// Update user
$app->put('/api/user/update/{id}', function ($id, Request $request) use ($app) {
	$user = $app['dao.user']->find($id);

	$user->setTitle($request->request->get('Title'));
	$user->setlastname($request->request->get('lastname'));
	$app['dao.user']->save($user);

	$responseData = array(
		'id' => $user->getId(),
		'firstname' => $user->getFirstname(),
		'lastname' => $user->getLastname()
	);

	return $app->json($responseData, 202);
})->bind('api_user_update');
