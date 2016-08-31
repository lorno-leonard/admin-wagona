<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SyllabiSubject_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Update Syllabi's Subject(s)
   *
   * @param array $subjects     subject ids
   * @param number $id          syllabus_id
   */
  public function update($subjects, $id) {
    // Delete existing subject ids of syllabi
    $this->db->where('syllabus_id', $id);
    $this->db->delete('syllabus_subject');

    // Add new subject ids of syllabi if any
    if(count($subjects) > 0) {
      $insertDataBatch = array();
      foreach($subjects as $v) {
        $insertDataBatch[] = array(
          'syllabus_id' => $id,
          'subject_id' => $v
        );
      }
      $this->db->insert_batch('syllabus_subject', $insertDataBatch);
    }
    return;
  }
}