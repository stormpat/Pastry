<?php

Route::get('/', 'PasteController@index');
Route::get('/paste/{hash}', 'PasteController@show');
Route::get('/pastes', 'PasteController@showAll');
Route::post('/paste', 'PasteController@store')->before('csrf_token');


Route::get('/test/', function()
{

    $o = new VJ\Paste\Models\Paste;
    return $o->all();

});