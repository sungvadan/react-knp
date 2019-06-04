<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class ApiCsrfValidationSubscriber implements EventSubscriberInterface
{
    public function onKernelRequest(GetResponseEvent $event)
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        $request = $event->getRequest();
        if (!$request->isMethodSafe(false)) {
            return;
        }

        if (!$request->attributes->get('_is_api')) {
            return;
        }

        if ($request->headers->get('Content-Type') != 'application/json') {
            $event->setResponse(new JsonResponse([
                'message' => 'Invalid Content type'
            ], 415));
        }
    }

    public static function getSubscribedEvents()
    {
        return [
           'kernel.request' => 'onKernelRequest',
        ];
    }
}
