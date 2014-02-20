<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		VJ\Paste\Models\Paste::create(array(
			'code' => '<?php echo "Hello World";',
			'hash' => 'h56',
			'created_at' => new DateTime,
			'updated_at' => new DateTime
		));

		VJ\Paste\Models\User::create(array(
			'username' => 'username',
			'password' => 'password',
			'created_at' => new DateTime,
			'updated_at' => new DateTime
		));
	}

}