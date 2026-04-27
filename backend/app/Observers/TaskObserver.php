<?php

namespace App\Observers;

use App\Models\Task;

class TaskObserver
{
    public function saving(Task $task): void
    {
        $task->priority_score = ($task->complexity * 0.4) + ($task->urgency * 0.6);
    }
}
