<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'complexity',
        'urgency',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'complexity' => 'integer',
            'urgency' => 'integer',
            'priority_score' => 'decimal:2',
        ];
    }
}
