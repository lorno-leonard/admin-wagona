<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payments_model extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  /**
   * Get payments with/without options
   *
   * @param array $opts         array containing [id, limit, offset]
   * 
   * @return array
   */
  public function get($opts) {
    // Default fields
    $fields = array('first_name', 'last_name', 'payer_email', 'item_name', 'mc_currency', 'payment_gross', 'payment_fee', 'payment_date');

    // Filter fields to display if any
    if(!is_null($opts['fields'])) {
      $fields = array_intersect(explode(',', $opts['fields']), $fields);
    }
    $fields[] = 'payment_id';

    // Limit, Offset
    $limit = !is_null($opts['limit']) ? $opts['limit'] : null;
    $offset = !is_null($opts['offset']) ? $opts['offset'] : null;

    // Specific fields
    if(!is_null($opts['id'])) {
      $this->db->where('payment_id', $opts['id']);
    }

    // Execute Query
    $this->db->select(implode(', ', $fields));
    $this->db->from('paypal_ipn_payment');
    $this->db->order_by('date_added', 'DESC');
    if(!is_null($limit)) {
      if(!is_null($offset)) $this->db->limit($limit, $offset);
      else $this->db->limit($limit);
    }
    $query = $this->db->get();

    return $query->result_array();
  }
}