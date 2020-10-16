<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pets extends Model
{

    /**
     * The attributes that are mass assignable
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'breed',
        'age',
        'personality',
        'shelter_id',
    ];

    public function getPet() 
    {
        return app('db')->select("select  p.*, l.name as Location, l.address  from pets p, locations l where l.id = p.shelter_id and p.shelter_id = 29 LIMIT 2");
    }
}