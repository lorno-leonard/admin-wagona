<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Subject extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/subject_model');
    $this->load->model('api/subjecttopic_model');
  }

  /**
   * Get subjects with/without URI parameters
   *
   * @param URI id              subject id
   * @param URI status          status [1,0]
   * @param URI syllabi_id      syllabi id
   * @param URI fields          fields to display, default all
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
    $syllabiId = !is_null($this->get('syllabi_id')) && is_numeric($this->get('syllabi_id')) ? $this->get('syllabi_id') : null;
    $fields = !is_null($this->get('fields')) && !empty($this->get('fields'))? $this->get('fields') : null;
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'status' => $status,
      'syllabi_id' => $syllabiId,
      'fields' => $fields,
      'limit' => $limit,
      'offset' => $offset
    );

    // Get Data
    try {
      $result = $this->subject_model->get($opts);
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
   * Create subject
   *
   * @param URI description     subject description
   * @param URI status          status [1,0]
   * @param URI topics        array of topic ids
   * 
   * @return json
   */
  public function index_post() {
    // Params
    $description = !is_null($this->post('description')) ? $this->post('description') : null;
    $status = !is_null($this->post('status')) && in_array((int) $this->post('status'), array(1, 0)) ? (int) $this->post('status') : null;
    $topics = !is_null($this->post('topics')) ? $this->post('topics') : null;

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
    $message = $this->subject_model->check($data);
    if(!empty($message)) {
      $this->set_response([
        'status' => FALSE,
        'message' => $message
      ], 400);
      return;
    }

    // Add Data
    try {
      $id = $this->subject_model->post($data);
      if(!is_null($topics)) {
        $this->subjecttopic_model->update($topics, $id);
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
   * Update subject
   *
   * @param URI id              syllabus id
   * @param URI description     syllabi description
   * @param URI status          status [1,0]
   * @param URI topics          array of topic ids
   * 
   * @return json
   */
  public function index_patch() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->patch('id');
    $description = !is_null($this->patch('description')) ? $this->patch('description') : null;
    $status = !is_null($this->patch('status')) && in_array((int) $this->patch('status'), array(1, 0)) ? (int) $this->patch('status') : null;
    $topics = !is_null($this->patch('topics')) ? $this->patch('topics') : null;

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
    $message = $this->subject_model->check($data, $id);
    if(!empty($message)) {
      $this->set_response([
        'status' => FALSE,
        'message' => $message
      ], 400);
      return;
    }

    // Update Data
    try {
      $this->subject_model->update($data, $id);
      if(!is_null($topics)) {
        $this->subjecttopic_model->update($topics, $id);
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
