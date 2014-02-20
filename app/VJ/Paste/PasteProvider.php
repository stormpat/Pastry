<?php namespace VJ\Paste;

use VJ\Paste\Models\Paste;
use Hashids\Hashids;
use Response;

class PasteProvider {

    protected $hash;

    public function __construct()
    {
        $this->hash = new Hashids('sUp3r5ecR3754LT');
    }

    public function all()
    {
        return Paste::all();
    }

    public function find($hash)
    {
        return Paste::whereHash($hash)->get()->toJson();
    }

    public function save($data, $lastId)
    {
        $paste = new Paste;
        $paste->code = $data;
        $paste->hash = $this->hash->encrypt($lastId + 1);
        $paste->save();
        return Response::json(array('status.url' => $paste->hash, 'status' => 200));
    }

}