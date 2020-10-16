<?php

namespace App\Http\Controllers;
use App\Models\Pets;
use Laravel\Lumen\Routing\Controller as BaseController;

class PetController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function index(Pets $pets, int $id=null)
    {
      $results = $pets->getPet();
      return response()->json($results, 201);
    }
}
