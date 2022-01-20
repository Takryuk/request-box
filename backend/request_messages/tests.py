from django.test import TestCase
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from .models import Message
from users.models import Profile
from .serializers import MessageListSerializer
from .views import ReceiverMessageListView, MessageCreateView
# Create your tests here.
User = get_user_model()


class MessageModelTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_is_empty(self):
        """初期状態では何も登録されていないことをチェック"""  
        saved_posts = Message.objects.all()
        self.assertEqual(saved_posts.count(), 0)


    def test_is_count_one(self):
        """1つレコードを適当に作成すると、レコードが1つだけカウントされることをテスト"""
        message = Message(message='test_title')
        message.save()
        saved_messages = Message.objects.all()
        self.assertEqual(saved_messages.count(), 1)

    def test_saving_and_retrieving_post(self):
        """内容を指定してデータを保存し、すぐに取り出した時に保存した時と同じ値が返されることをテスト"""
        post = Message()
        message = 'test_message'
        post.message = message
        post.save()
        saved_posts = Message.objects.all()
        actual_post = saved_posts[0]

        self.assertEqual(actual_post.message, message)

    def test_receiver_message_list_view_url(self):   
        """message list ページへのURLでアクセス可能かテスト"""
        view = resolve('/messages/list')
        self.assertEqual(view.func.view_class, ReceiverMessageListView)

    def test_message_create_view_url(self):
        """message create ページへのURLでアクセス可能かテスト"""
        view = resolve('/messages/create')
        self.assertEqual(view.func.view_class, MessageCreateView)


    def test_get(self):
        """GET メソッドでアクセスしてステータスコード200を返されることを確認"""
        Message.objects.create(message='test_message_2')
        email = "test1@gmail.com"
        username="test user"
        password="some_password_123"
        user = User.objects.create_user(email=email, username=username, password=password)
        self.client.force_login(user)
        res = self.client.get(reverse('messages:message-list'))
        items = Message.objects.filter(receiver=user.profile)
        serializer = MessageListSerializer(items, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['results'], serializer.data)


    def test_post(self):
        """POST メソッドでアクセスしてステータスコード200を返されることを確認"""
        email = "test1@gmail.com"
        username="test user"
        password="some_password_123"
        user = User.objects.create_user(email=email, username=username, password=password)


        message = Message.objects.create(message='test message')
        payload = {
            'message': message.message,
            'uid': user.profile.id,
        }
        res = self.client.post(reverse('messages:message-create'), payload)
        # DBのデータ取得
        item = Message.objects.get(id=res.data['id'])
        # status code確認
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        # DB内容とpayloadで渡したparamsが一致するか確認
        self.assertEqual(payload['message'], item.message)
        self.assertEqual(payload['uid'], item.receiver.id)
