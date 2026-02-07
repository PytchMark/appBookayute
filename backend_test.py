"""
Book-A-Yute Backend API Testing Suite
Tests all backend endpoints including AI features
"""
import requests
import sys
import json
from datetime import datetime

class BookAYuteAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection Error: Cannot connect to {url}")
            self.failed_tests.append({
                'name': name,
                'error': 'Connection Error',
                'url': url
            })
            return False, {}
        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout: Request took too long")
            self.failed_tests.append({
                'name': name,
                'error': 'Timeout',
                'url': url
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'url': url
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        if success:
            ai_available = response.get('ai_available', False)
            print(f"   AI Available: {ai_available}")
        return success

    def test_session_recap(self):
        """Test session recap AI endpoint"""
        test_notes = "Discussed project timeline with client. They want 3 tracks delivered by Feb 15. Good energy in the session, client is excited about the project."
        
        success, response = self.run_test(
            "AI Session Recap",
            "POST",
            "api/ai/session-recap",
            200,
            data={"notes": test_notes}
        )
        return success

    def test_take_log(self):
        """Test take log AI endpoint"""
        test_notes = "00:00 - Setup complete, 05:00 - First take recorded, good energy, 12:00 - Second take, better performance, 18:00 - Final review and approval"
        
        success, response = self.run_test(
            "AI Take Log",
            "POST",
            "api/ai/take-log",
            200,
            data={"notes": test_notes}
        )
        return success

    def test_follow_up(self):
        """Test follow-up message AI endpoint"""
        success, response = self.run_test(
            "AI Follow-Up Message",
            "POST",
            "api/ai/follow-up",
            200,
            data={
                "clientName": "John Smith",
                "eventType": "Corporate Event",
                "messageType": "confirmation"
            }
        )
        return success

    def test_lead_summary(self):
        """Test lead summary AI endpoint"""
        test_lead = {
            "client_name": "ABC Corp",
            "event_type": "Corporate Event",
            "budget": "$5000",
            "date": "2024-03-15",
            "requirements": "DJ for company party, 4 hours"
        }
        
        success, response = self.run_test(
            "AI Lead Summary",
            "POST",
            "api/ai/lead-summary",
            200,
            data={"lead": test_lead}
        )
        return success

    def test_weekly_insights(self):
        """Test weekly insights AI endpoint"""
        success, response = self.run_test(
            "AI Weekly Insights",
            "POST",
            "api/ai/weekly-insights",
            200
        )
        return success

def main():
    print("🚀 Starting Book-A-Yute Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = BookAYuteAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_check,
        tester.test_session_recap,
        tester.test_take_log,
        tester.test_follow_up,
        tester.test_lead_summary,
        tester.test_weekly_insights,
    ]
    
    for test in tests:
        test()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure['name']}: {failure.get('error', f\"Expected {failure.get('expected')}, got {failure.get('actual')}\")}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())