<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Subject extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/subject_model');
  }

  /**
   * Get subject with/without URI parameters
   *
   * @param URI id              subject id
   * @param URI syllabi id      syllabi id
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
}
