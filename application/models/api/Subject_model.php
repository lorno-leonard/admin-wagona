<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subject_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get subjects with/without options
   *
   * @param array $opts         array containing [id, status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('description', 'status', 'num_topics');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    if(in_array('num_topics', $fields)) {
      // Replace num_topics field to a sub query
      $fields = array_diff($fields, array('num_topics'));
      $fields[] = '(SELECT COUNT(subject_topic.subject_id) FROM subject_topic WHERE subject_topic.subject_id = test_subject.subject_id) AS num_topics';
    }
    $fields[] = 'test_subject.subject_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('subject_id', $opts['id']);
    }
    if(!is_null($opts['status'])) {
      $this->db->where('status', $opts['status']);
    }
    if(!is_null($opts['syllabi_id'])) {
      $this->db->join('syllabus_subject', 'test_subject.subject_id = syllabus_subject.subject_id');
      $this->db->where('syllabus_subject.syllabus_id', $opts['syllabi_id']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields), FALSE);
    $this->db->from('test_subject');
    $this->db->order_by('description', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }
}