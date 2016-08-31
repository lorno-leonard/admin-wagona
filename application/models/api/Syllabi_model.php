<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Syllabi_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get syllabus with/without options
   *
   * @param array $opts         array containing [id, status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('description', 'status', 'num_subjects');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    if(in_array('num_subjects', $fields)) {
      // Replace num_subjects field to a sub query
      $fields = array_diff($fields, array('num_subjects'));
      $fields[] = '(SELECT COUNT(syllabus_subject.syllabus_id) FROM syllabus_subject WHERE syllabus_subject.syllabus_id = syllabus_list.syllabus_id) AS num_subjects';
    }
    $fields[] = 'syllabus_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('syllabus_id', $opts['id']);
    }
    if(!is_null($opts['status'])) {
      $this->db->where('status', $opts['status']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields), FALSE);
    $this->db->from('syllabus_list');
    $this->db->order_by('description', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }

  /**
   * Create syllabi
   *
   * @param array $data
   *
   * @return number       insert id
   */
  public function post($data) {
    $this->db->insert('syllabus_list', $data);
    return $this->db->insert_id();
  }

  /**
   * Update syllabi
   *
   * @param array $data     columns to update
   * @param number $id      record id
   */
  public function update($data, $id) {
    $this->db->where('syllabus_id', $id);
    $this->db->update('syllabus_list', $data);
    return;
  }

  /**
   * Check syllabi
   *
   * @param array $data
   * @param number $id
   *
   * @return string         error message
   */
  public function check($data, $id = null) {
    // Check Description
    if(isset($data['description'])) {
      $this->db->like('description', $data['description']);
      $this->db->from('syllabus_list');
      if(!is_null($id)) {
        $this->db->where('syllabus_id !=', $id);
      }
      $count = $this->db->count_all_results();
      if($count > 0) {
        return 'Syllabi description is already taken.';
      }
    }

    return '';
  }
}