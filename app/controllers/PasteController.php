<?php

use Pastry\Paste\PasteProvider;

class PasteController extends BaseController {

    protected $paste;

    public function __construct()
    {
        $this->paste = new PasteProvider;
    }

    public function index()
    {
        return View::make('bootstrap');
    }

    public function store()
    {

        $lastId = $this->paste->all()->last()->id;
        $data = Input::get('code');
        return $this->paste->save($data, $lastId);
    }

    public function showAll()
    {
        return $this->paste->all();
    }

    public function show($hash)
    {
        return $this->paste->find($hash);
    }

}