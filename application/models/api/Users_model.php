<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get users with/without options
   *
   * @param array $opts         array containing [id, status, account_type, payment_status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('account_id', 'first_name', 'surname', 'account_type', 'payment_status', 'status');

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('account_id', $opts['id']);
    }
    if(!is_null($opts['status'])) {
      $this->db->where('status', $opts['status']);
    }
    if(!is_null($opts['account_type'])) {
      $this->db->where('account_type', $opts['account_type']);
    }
    if(!is_null($opts['payment_status'])) {
      $this->db->where('payment_status', $opts['payment_status']);
    } 

    // Execute Query
    $this->db->select(implode(', ', $fields));
    $this->db->from('user_accounts');
    $this->db->order_by('account_id', 'ASC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }

  /**
   * Update user
   *
   * @param array $data     columns to update
   * @param number $id      record id
   */
  public function update($data, $id) {
    $this->db->where('account_id', $id);
    $this->db->update('user_accounts', $data);
    return;
  }
}