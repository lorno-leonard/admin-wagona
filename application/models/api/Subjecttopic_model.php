<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subjecttopic_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Update Subject's Topic(s)
   *
   * @param array $topics     topic ids
   * @param number $id        subject_id
   */
  public function update($topics, $id) {
    // Delete existing topic ids of subject
    $this->db->where('subject_id', $id);
    $this->db->delete('subject_topic');

    // Add new topic ids of subject if any
    if(count($topics) > 0) {
      $insertDataBatch = array();
      foreach($topics as $v) {
        $insertDataBatch[] = array(
          'subject_id' => $id,
          'topic_id' => $v
        );
      }
      $this->db->insert_batch('subject_topic', $insertDataBatch);
    }
    return;
  }
}