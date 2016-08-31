<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Syllabi extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/syllabi_model');
    $this->load->model('api/syllabisubject_model');
  }

  /**
   * Get syllabus with/without URI parameters
   *
   * @param URI id              syllabus id
   * @param URI status          status [1,0]
   * @param URI limit           number of records to get, default: 20
   * @param URI offset          index where to start getting records
   * 
   * @return json
   */
  public function index_get() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->get('id');
    $status = !is_null($this->get('status')) && in_array((int) $this->get('status'), array(1, 0)) ? $this->get('status') : null;
    $fields = !is_null($this->get('fields')) && !empty($this->get('fields'))? $this->get('fields') : null;
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'status' => $status,
      'fields' => $fields,
      'limit' => $limit,
      'offset' => $offset
    );

    // Get Data
    try {
      $result = $this->syllabi_model->get($opts);
      $this->set_response($result, REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'classname' => get_class($e),
        'message' => $e->getMessage()
      ], 400);
    }
  }

  /**
   * Create syllabi
   *
   * @param URI description     syllabi description
   * @param URI status          status [1,0]
   * @param URI subjects        array of subject ids
   * 
   * @return json
   */
  public function index_post() {
    // Params
    $description = !is_null($this->post('description')) ? $this->post('description') : null;
    $status = !is_null($this->post('status')) && in_array((int) $this->post('status'), array(1, 0)) ? (int) $this->post('status') : null;
    $subjects = !is_null($this->post('subjects')) ? $this->post('subjects') : null;

    // Check if params are null
    if(is_null($description) || is_null($status)) {
      $this->set_response([
        'status' => FALSE,
        'message' => 'no parameter passsed.'
      ], 400);
      return;
    }

    // Set Add Data
    $data = array();
    $data['description'] = $description;
    $data['status'] = $status;

    // Check Data
    $message = $this->syllabi_model->check($data);
    if(!empty($message)) {
      $this->set_response([
        'status' => FALSE,
        'message' => $message
      ], 400);
      return;
    }

    // Add Data
    try {
      $id = $this->syllabi_model->post($data);
      if(!is_null($subjects)) {
        $this->syllabisubject_model->update($subjects, $id);
      }
      $this->set_response(array(), REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'classname' => get_class($e),
        'message' => $e->getMessage()
      ], 400);
    }
  }

  /**
   * Update syllabi
   *
   * @param URI id              syllabus id
   * @param URI description     syllabi description
   * @param URI status          status [1,0]
   * @param URI subjects        array of subject ids
   * 
   * @return json
   */
  public function index_patch() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->patch('id');
    $description = !is_null($this->patch('description')) ? $this->patch('description') : null;
    $status = !is_null($this->patch('status')) && in_array((int) $this->patch('status'), array(1, 0)) ? (int) $this->patch('status') : null;
    $subjects = !is_null($this->patch('subjects')) ? $this->patch('subjects') : null;

    // Set Update Data
    $data = array();
    if(!is_null($description)) $data['description'] = $description;
    if(!is_null($status)) $data['status'] = $status;

    // Check if there's no data to be updated
    if(count($data) == 0) {
      $this->set_response([
        'status' => FALSE,
        'message' => 'no parameter passsed.'
      ], 400);
      return;
    }

    // Check Data
    $message = $this->syllabi_model->check($data, $id);
    if(!empty($message)) {
      $this->set_response([
        'status' => FALSE,
        'message' => $message
      ], 400);
      return;
    }

    // Update Data
    try {
      $this->syllabi_model->update($data, $id);
      if(!is_null($subjects)) {
        $this->syllabisubject_model->update($subjects, $id);
      }
      $this->set_response(array(), REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'classname' => get_class($e),
        'message' => $e->getMessage()
      ], 400);
    }
  }
}
