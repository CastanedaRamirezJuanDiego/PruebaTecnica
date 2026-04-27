<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Laravel\Sanctum\PersonalAccessToken;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        PersonalAccessToken::query()
            ->where('token', hash('sha256', 'hardcoded_token_for_test'))
            ->delete();

        $user->tokens()->create([
            'name' => 'test-token',
            'token' => hash('sha256', 'hardcoded_token_for_test'),
            'abilities' => ['*'],
        ]);
    }
}
