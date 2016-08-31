<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Country_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get countries with/without options
   *
   * @param array $opts         array containing [id, status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('description', 'status');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    $fields[] = 'country_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('country_id', $opts['id']);
    }
    if(!is_null($opts['status'])) {
      $this->db->where('status', $opts['status']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields));
    $this->db->from('country_list');
    $this->db->order_by('country_id', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }

  /**
   * Update country
   *
   * @param array $data     columns to update
   * @param number $id      record id
   */
  public function update($data, $id) {
    $this->db->where('country_id', $id);
    $this->db->update('country_list', $data);
    return;
  }
}