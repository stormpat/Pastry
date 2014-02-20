<?php

Route::get('/', 'PasteController@index');
Route::get('/paste/{hash}', 'PasteController@show');
Route::get('/pastes', 'PasteController@showAll');
Route::post('/paste', 'PasteController@store')->before('csrf_token');
