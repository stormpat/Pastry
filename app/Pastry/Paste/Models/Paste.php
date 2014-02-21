<?php namespace Pastry\Paste\Models;

use Eloquent;

class Paste extends Eloquent {

     protected $hidden = array('id', 'deleted_at', 'updated_at');

}