describe("Blog app", function () {
	beforeEach(function () {
		// empty the db here
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

		// create a user for the backend here
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		const user2 = {
			name: "mlg",
			username: "mlg",
			password: "mlg",
		};

		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
		cy.visit("");
	});

	it("Login form is shown", function () {
		cy.contains("Log in to application");
		cy.contains("username");
		cy.contains("password");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();

			cy.contains("mluukkai logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("#username").type("failure");
			cy.get("#password").type("mlg");
			cy.get("#login-button").click();

			cy.get(".notification").should("contain", "Wrong username or password");
			cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "mluukkai", password: "salainen" });
		});

		it("A blog can be created", function () {
			cy.contains("create new blog").click();

			cy.get("#title").type("Test");
			cy.get("#author").type("Author-test");
			cy.get("#url").type("test.com");
			cy.get("#submit-blogForm").click();

			cy.get(".notification").should(
				"contain",
				"A new blog Test by Author-test added"
			);
			cy.get(".blog").contains("Test Author-test");
		});

		describe("and a blog exists", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "blog1",
					author: "cypress1",
					url: "cypress.com",
				});
				cy.createBlog({
					title: "blog2",
					author: "cypress2",
					url: "cypress.com",
					likes: 10
				});
				cy.createBlog({
					title: "blog3",
					author: "cypress2",
					url: "cypress.com",
					likes: 5
				});
			});

			it("it can be liked", function () {
				cy.contains("blog1").parent().parent().as("blogContainer");

				cy.get("@blogContainer").contains("view").click();
				cy.get("@blogContainer").contains("like").click();
				cy.get("@blogContainer").get("#likes").contains("1");
			});

			it("it can be deleted", function () {
				cy.contains("blog2").parent().parent().as("blogContainer");
				cy.get("@blogContainer").contains("view").click();
				cy.get("@blogContainer").contains("remove").click();

				cy.get(".notification").should(
					"contain",
					"Deleted"
				);
				cy.get(".blog").should("not.contain", "blog2");
			});

			describe("Only creator can see delete button", function () {
				it("creator can see delete button", function () {
					cy.contains("blog1").parent().parent().as("blogContainer");
					cy.get("@blogContainer").contains("view").click();

					// Creator should see the delete button
					cy.get("@blogContainer").should("contain", "remove");
				});

				it("other users cannot see delete button", function () {
					// Logout current user
					cy.contains("logout").click();

					// Login as different user
					cy.login({ username: "mlg", password: "mlg" });

					// Check the blog created by mluukkai
					cy.contains("blog1").parent().parent().as("blogContainer");
					cy.get("@blogContainer").contains("view").click();

					// Different user should NOT see the delete button
					cy.get("@blogContainer").should("not.contain", "remove");
				});
			});

			it('Blogs are ordered by likes, most liked blog being first', function () {
				cy.get('.blog').eq(0).should('contain', 'blog2')
				cy.get(".blog").eq(1).should("contain", "blog3");
				cy.get(".blog").eq(2).should("contain", "blog1");
			})
		});
	});
});
