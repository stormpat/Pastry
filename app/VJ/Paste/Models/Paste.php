<?php namespace VJ\Paste\Models;

use Eloquent;

class Paste extends Eloquent {

     protected $hidden = array('id', 'deleted_at', 'updated_at');

}