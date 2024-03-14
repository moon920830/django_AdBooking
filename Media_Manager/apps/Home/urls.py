from django.urls import path

from . import views

urlpatterns = [
	# path('', views.index_view, name='index_view'),
	path('login/', views.login_view, name='login_view'),
	path('forgot/', views.forgot, name='forgot'),
	path('reset/', views.reset, name='reset'),
	path('logout/', views.logout_view, name='logout_view'),
	path('support/', views.support, name='support'),

	path('', views.index, name='index'),
	path('campaign-dashboard', views.adDashboard, name='adDashboard'),
	path('ad-rates', views.adRateIndex, name='adRateIndex'),
	path('new-ad-rate', views.newAdRate, name='newAdRate'),
	path('completed-rate', views.completedRate, name='completedRate'),
	path('edit-rate', views.editRate, name='editRate'),
	path('publication-dashboard', views.pubDashboard, name='pubDashboard'),

	path('create-gl-code', views.newGlCode, name='newGlCode'),

	path('admin/', views.admin, name='admin'),
	path('admin/general', views.adminGeneral, name='adminGeneral'),
	path('admin/ads', views.adminAds, name='adminAds'),

]