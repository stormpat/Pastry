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
        $paste->code = $this->convert($data);
        $paste->hash = $this->hash->encrypt($lastId + 1);
        $paste->save();
        return Response::json(array('url' => $paste->hash, 'status' => 200));
    }

    public function convert($html) {
        if (is_array($html))
        {
            $html = $html[0]['code'];
        }
        return html_entity_decode($html);
    }

}