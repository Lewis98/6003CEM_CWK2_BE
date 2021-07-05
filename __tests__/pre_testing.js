it('jest environment tests', () => {
	expect(process.env.DB_DATABASE).toBe('test_db');
})
