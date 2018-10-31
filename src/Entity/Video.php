<?php
namespace LaHairstyleApi\Entity;

class Video 
{
	/**
	* @var integer
	**/
	private $id;

	/**
	* @var string 
	**/
	private $title;

	/**
	* @var string 
	**/
	private $description;

	/**
	* @var string
	**/
	private $thumbnail;

	/**
	* @var string 
	**/
	private $videoId;

	/**
	* @var string 
	**/
	private $search;

	/**
	 * @return int
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @param int $id
	 */
	public function setId( $id ) {
		$this->id = $id;
	}

	/**
	* @var string  $title
	**/

	public function setTitle($title) {
		$this->title = $title;
	}

	public function getTitle() {
		return $this->title;
	}

	/**
	* @var string  $description
	**/

	public function setDescription($description) {
		$this->description = $description;
	}

	public function getDescription() {
		return $this->description;
	}

    /**
     * @var string $thumbnail
     */
    public function getThumbnail()
    {
        return $this->thumbnail;
    }

    /**
     * @param mixed $thumbnail
     *
     * @return self
     */
    public function setThumbnail($thumbnail)
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    /**
    * @var string $videoId
    **/
    public function setVideoId($videoId) {
    	$this->videoId = $videoId;
    }

    public function getVideoId() {
    	return $this->videoId;
    }

    public function setSearch($search) {
    	$this->search = $search;
    }

    public function getSearch() {
    	return $this->search;
    }
}