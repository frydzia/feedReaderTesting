/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* First test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has URL and URL is not empty', function() {
      for (var feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed).not.toEqual(jasmine.objectContaining({
          url: ''
        }));
      };
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has a name defined and name is not empty', function() {
      for (var feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed).not.toEqual(jasmine.objectContaining({
          name: ''
        }));
      };
    });
  });

  /* Test suite named "The menu" */
  describe('The menu', function() {
    /* Test that ensures the menu element is
     * hidden by default.
     */
    var menuIcon = document.querySelector('.menu-icon-link');
    var body = document.querySelector('body');

    it('should be hidden by default', function() {
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('should changes visibility when the menu icon is clicked', function() {
      menuIcon.click();
      expect(body.classList.contains('menu-hidden')).not.toBe(true);

      menuIcon.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* Test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     *
     * loadFeed() is asynchronous so this test use
     * Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('has at least 1 entry after loadFeed function is called', function(done) {
      var numberOfEntries = document.querySelector('.feed').getElementsByClassName('entry').length;

      expect(numberOfEntries).toBeGreaterThan(0);
      done();
    });
  });

  /* Test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     *
     * loadFeed() is asynchronous so this test use
     * Jasmine's beforeEach and asynchronous done() function.
     */
    var oldFeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        oldFeed = document.querySelector('.feed').innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('should changes content when a new feed is loaded', function(done) {
      var newFeed = document.querySelector('.feed').innerHTML;
      expect(newFeed).not.toBe(oldFeed);
      done();
    });
  });
}());
