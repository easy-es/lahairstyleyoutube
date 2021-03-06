<?php 

namespace LaHairstyleApi;
Use Doctrine\DBAL\Connection;
Use LaHairstyleApi\Entity\Video;

class VideoDAO 
{
	private $db;

	public function __construct(Connection $db) {
		$this->db = $db;
	}

	protected function getDb() {
		return $this->db;
	}

	public function findAll()
	{
		$sql = "SELECT * FROM video";
		$result = $this->getDb()->fetchAll($sql);

		$entities = array();
		foreach ( $result as $row ) {
			$id = $row['id'];
			$entities[$id] = $this->buildDomainObjects($row);
		}

		return $entities;
	}

	public function save($video)
	{
		$videoData = array(
			'title' => $video->getTitle(),
			'description' => $video->getDescription(),
			'videoid' => $video->getVideoId(),
			'thumbnail' => $video->getThumbnail(),
			'search' => $video->getSearch()
		);

		// TODO CHECK
		if ($video->getId()) {
			$this->getDb()->update('video', $videoData, array('id' => $video->getId()));
		} else {
			$this->getDb()->insert('video', $videoData);
			$id = $this->getDb()->lastInsertId();
			$video->setId($id);
		}
	}

	protected function buildDomainObjects($row)
	{
		$video = new Video();
		$video->setId($row['id']);
		$video->setTitle($row['title']);
		$video->setDescription($row['description']);
		$video->setVideoId($row['videoid']);
		$video->setThumbnail($row['thumbnail']);
		$video->setSearch($row['search']);

		return $video;
	}

}