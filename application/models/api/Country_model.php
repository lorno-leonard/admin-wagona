<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Country_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * This method will get countrues with specific or none optiona
   *
   * @param array $opts         array containing [id, status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('country_id', 'description', 'status');

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : 20;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : 0;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('country_id', $opts['id']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields));
    $this->db->from('country_list');
    $this->db->order_by('country_id', 'ASC');
    $this->db->limit($limit, $offset);
    $query = $this->db->get();

    return $query->result_array();
  }
}