<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prices_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get prices with/without options
   *
   * @param array $opts         array containing [id, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('description', 'price', 'payer');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    $fields[] = 'type_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('type_id', $opts['id']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields));
    $this->db->from('payment_types');
    $this->db->order_by('payer', 'ASC');
    $this->db->order_by('price', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }

  /**
   * Update price
   *
   * @param array $data     columns to update
   * @param number $id      record id
   */
  public function update($data, $id) {
    $this->db->where('type_id', $id);
    $this->db->update('payment_types', $data);
    return;
  }
}