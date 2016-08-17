<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * This method will get users with specific or none optiona
   *
   * @param array $opts         array containing [id, status, account_type, payment_status, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('account_id', 'first_name', 'surname', 'account_type', 'payment_status', 'status');

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : 20;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : 0;

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
    $this->db->limit($limit, $offset);
    $query = $this->db->get();

    return $query->result_array();
  }
}