from django.urls import path
from .views import RegisterView, LogoutAPIView, SetNewPasswordAPIView, VerifyEmail, LoginAPIView, PasswordTokenCheckAPI, RequestPasswordResetEmail,MessageApiView,AllMessagesApiView, EmailApiView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
from .views import update_user
urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),#esto para resgistrarse
    path('users/update/<int:pk>/', update_user, name='user-update'),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),
     path('messaege/', MessageApiView.as_view(), name="message"),
     path('messaege/sacar/', AllMessagesApiView.as_view(), name="message_sacar"),
     path('email/', EmailApiView.as_view(), name="email"),
     
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# from django.urls import path
# from users.views import CustomUserCreate, BlacklistTokenUpdateView

# app_name = 'users'

# urlpatterns = [
#     path('register/', CustomUserCreate.as_view(), name="create_user"),
#     # path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),name='blacklist')
# ]