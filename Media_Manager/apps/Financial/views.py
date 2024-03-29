from django.shortcuts import render, redirect
from django.http import HttpResponse
from ... import views


url = "192.241.131.173:8000"
login_redirect = "/login/?next="

def financial_home(request):
	# Check if user is logged in, if not, redirect  to login screen
	if request is None or not request.user.is_authenticated:
		return redirect(login_redirect + "accounting")

	if not request.user.has_perm('BI.financial_access'):
		return render(request, "accounting.html", {"access": "deny", "message": "Access denied!", "menu": views.get_sidebar(request)})

	context = {
			"access": "allow",
		 	"message":"", 
		 	"groups": ', '.join(views.get_groups(request)), 
		 	"menu": views.get_sidebar(request),
			"financial" : "yes"
		}
	return render(request, "financial_home.html", context)