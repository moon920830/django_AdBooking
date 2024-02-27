from django.urls import path

from . import views

urlpatterns = [
	path('', views.index_view, name='index_view'),
	path('login/', views.login_view, name='login_view'),
	path('forgot/', views.forgot, name='forgot'),
	path('reset/', views.reset, name='reset'),
	path('logout/', views.logout_view, name='logout_view'),
	path('support/', views.support, name='support'),
]