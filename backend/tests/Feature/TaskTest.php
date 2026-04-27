<?php

use App\Models\Task;
use App\Models\User;

it('calculates priority score when creating a task', function () {
    $user = User::factory()->create();

    $user->tokens()->create([
        'name' => 'test-token',
        'token' => hash('sha256', 'hardcoded_token_for_test'),
        'abilities' => ['*'],
    ]);

    $response = $this
        ->withToken('hardcoded_token_for_test')
        ->postJson('/api/tasks', [
            'title' => 'Test task',
            'description' => 'Testing auto score',
            'complexity' => 5,
            'urgency' => 10,
            'status' => 'todo',
        ]);

    $response->assertCreated();

    $task = Task::query()->where('title', 'Test task')->firstOrFail();

    expect((float) $task->priority_score)->toBe(8.0);
});
