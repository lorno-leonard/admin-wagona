<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Topic_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get topics with/without options
   *
   * @param array $opts         array containing [id, status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('description', 'status', 'is_paid');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    $fields[] = 'test_topic.topic_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('topic_id', $opts['id']);
    }
    if(!is_null($opts['status'])) {
      $this->db->where('status', $opts['status']);
    }
    if(!is_null($opts['subject_id'])) {
      $this->db->join('subject_topic', 'test_topic.topic_id = subject_topic.topic_id');
      $this->db->where('subject_topic.subject_id', $opts['subject_id']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields), FALSE);
    $this->db->from('test_topic');
    $this->db->order_by('description', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }
}